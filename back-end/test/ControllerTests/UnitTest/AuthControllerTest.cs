using AuthenticationService.Controllers;
using AuthenticationService.Exceptions;
using AuthenticationService.Models;
using AuthenticationService.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http.Controllers;
using Xunit;

namespace Test.ControllerTests.UnitTest
{
    public class AuthControllerTest
    {
        [Fact]
        public void RegisterShouldReturnCreated()
        {
            User user = new User { UserId = "Jack", Password = "password@123" };
            var mockService = new Mock<IAuthService>();
            mockService.Setup(svc => svc.RegisterUser(user)).Returns(true);

            JWT jwtSettings = new JWT() { Audience = "TestAudience", Issuer = "TestIssuer", SecretKey = "TestKeyForJWTToken" };
            var mockJWT = new Mock<IOptions<JWT>>();
            mockJWT.Setup(j => j.Value).Returns(jwtSettings);

            var controller = new AuthController(mockService.Object, mockJWT.Object);

            var actual = controller.Register(user);
            var actionResult = Assert.IsType<CreatedResult>(actual);
            var actionValue = Assert.IsAssignableFrom<bool>(actionResult.Value);
            Assert.True(actionValue);
        }
        [Fact]
        public void RegisterShouldReturnConflict()
        {
            User user = new User { UserId = "Jack", Password = "password@123" };
            var mockService = new Mock<IAuthService>();
            mockService.Setup(svc => svc.RegisterUser(user)).Throws(new UserAlreadyExistsException($"This userId {user.UserId} already in use"));


            JWT jwtSettings = new JWT() { Audience = "TestAudience", Issuer = "TestIssuer", SecretKey = "TestKeyForJWTToken" };
            var mockJWT = new Mock<IOptions<JWT>>();
            mockJWT.Setup(j => j.Value).Returns(jwtSettings);

            var controller = new AuthController(mockService.Object, mockJWT.Object);

            var actual = controller.Register(user);
            var actionResult = Assert.IsType<ConflictObjectResult>(actual);
            Assert.Equal($"This userId {user.UserId} already in use", actionResult.Value);
        }

        [Fact]
        public void LoginShouldReturnJWT()
        {
            User user = new User { UserId = "Jack", Password = "password@123" };
            var mockService = new Mock<IAuthService>();
            mockService.Setup(svc => svc.LoginUser(user)).Returns(true);

            JWT jwtSettings = new JWT() { Audience = "TestAudience", Issuer = "TestIssuer", SecretKey = "TestKeyForJWTToken" };
            var mockJWT = new Mock<IOptions<JWT>>();
            mockJWT.Setup(j => j.Value).Returns(jwtSettings);

            var controller = new AuthController(mockService.Object, mockJWT.Object);

            var actual = controller.Login(user);
            var actionResult = Assert.IsType<OkObjectResult>(actual);
            var data = JsonConvert.DeserializeObject<TokenModel>(actionResult.Value.ToString());

            var jwt = data.Token;
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwt);
            var lstclaims = token.Claims as List<Claim>;
            Assert.NotNull(lstclaims.Find(c => c.Type == "userId"));
        }

        [Fact]
        public void LoginShouldReturnUnauthorized()
        {
            User user = new User { UserId = "Sam", Password = "password@123" };
            var mockService = new Mock<IAuthService>();
            mockService.Setup(svc => svc.LoginUser(user)).Returns(false);

            JWT jwtSettings = new JWT() { Audience = "TestAudience", Issuer = "TestIssuer", SecretKey = "TestKeyForJWTToken" };
            var mockJWT = new Mock<IOptions<JWT>>();
            mockJWT.Setup(j => j.Value).Returns(jwtSettings);

            var controller = new AuthController(mockService.Object, mockJWT.Object);

            var actual = controller.Login(user);
            var actionResult = Assert.IsType<UnauthorizedObjectResult>(actual);
            Assert.Equal("Invalid user id or password", actionResult.Value);
        }
    }
}
