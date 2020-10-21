using AuthenticationService.Exceptions;
using AuthenticationService.Models;
using AuthenticationService.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthenticationService.Controllers
{
    /// <summary>
    /// Api controller class for authentication
    /// </summary>
    [Route("/api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        /// <summary>
        /// readonly property for authorization service class
        /// </summary>
        readonly IAuthService authService;

        /// <summary>
        /// readonly property for values related to JWT authentication
        /// </summary>
        private IOptions<JWT> jwtSettings;

        /// <summary>
        /// Parametrised constructor for injecting the authorization service property
        /// </summary>
        /// <param name="authService"></param>
        /// <param name="jwtSettings"></param>
        public AuthController(IAuthService authService, IOptions<JWT> jwtSettings)
        {
            this.authService = authService;
            this.jwtSettings = jwtSettings;
        }

        /// <summary>
        /// Method for generating token
        /// </summary>
        /// <param name="userId">The user for whom the token is to be generated</param>
        /// <returns>The generated token string</returns>
        private string GenerateToken(string userId)
        {
            var claims = new[]
            {
                new Claim("userId", userId)
            };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Value.SecretKey));
            var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings.Value.Issuer,
                audience: jwtSettings.Value.Audience,
                expires: DateTime.UtcNow.AddMinutes(10),
                claims: claims,
                signingCredentials: signature
            );

            var tokenResponse = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            };

            return JsonConvert.SerializeObject(tokenResponse);
        }

        /// <summary>
        /// Method for authenticating the token
        /// </summary>
        /// <param name="token">The token to be authenticated</param>
        /// <returns>true if valid token</returns>
        private bool validateJWTToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = jwtSettings.Value.Issuer,
                    ValidAudience = jwtSettings.Value.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Value.SecretKey))
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Http post method for registering new users
        /// </summary>
        /// <remarks>
        /// Sample Request:
        /// 
        /// POST/ Register
        /// {
        ///     "UserId" : "string",
        ///     "Password" : "string"
        /// }
        /// 
        /// </remarks>
        /// <param name="user">The user data to be registered</param>
        /// <response code="201">If user gets registered successfully</response>
        /// <response code="409">If user already exists</response>
        /// <response code="500">If some error occurs</response>
        /// <returns></returns>
        [HttpPost("register")]
        [ActionName("Post")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Register(User user)
        {
            try
            {
                bool registered = authService.RegisterUser(user);
                return Created("api/auth/register", registered);
            }
            catch (UserAlreadyExistsException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some error occurred, please try again later!!");
            }
        }

        /// <summary>
        /// Http post method for user log in
        /// </summary>
        /// <remarks>
        /// Sample Request:
        /// 
        /// POST/ Login
        /// {
        ///     "UserId" : "string",
        ///     "Password" : "string"
        /// }
        /// 
        /// </remarks>
        /// <param name="user">The credentials of user for login</param>
        /// <response code="200">If login is successfull</response>
        /// <response code="401">If login fails</response>
        /// <response code="500">If some error occurs</response>
        /// <returns></returns>
        [HttpPost("login")]
        [ActionName("Post")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Login(User user)
        {
            try
            {
                if (authService.LoginUser(user))
                {
                    return Ok(GenerateToken(user.UserId));
                }
                else
                {
                    return Unauthorized("Invalid user id or password");
                }
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Some error occurred, please try again later!!");
            }
        }

        /// <summary>
        /// Http get method for checking whether the token is authenticated or not
        /// </summary>
        /// <response code="200">If token is authenticated</response>
        /// <response code="500">If token is not authenticated</response>
        /// <returns></returns>
        [HttpGet("isAuthenticated")]
        [ActionName("Post")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult IsAuthenticated()
        {
            string token = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token))
            {
                return StatusCode(500, "Request header doesn't contain any token");
            }
            else
            {
                token = token.Replace("Bearer ", "");
                if (validateJWTToken(token))
                {
                    return Ok(true);
                }
                else
                {
                    return StatusCode(500, "User is not authenticated!!");
                }
            }
        }
    }
}
