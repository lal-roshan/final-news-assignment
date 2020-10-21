using AuthenticationService;
using AuthenticationService.Models;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using Xunit;

namespace Test.ControllerTests.IntegrationTest
{
    [Collection("Auth API")]
    [TestCaseOrderer("Test.PriorityOrderer", "test")]
    public class AuthControllerTest
    {
        private readonly HttpClient _client;

        public AuthControllerTest(AuthWebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateClient();
        }

        #region positivetests
        [Fact, TestPriority(1)]
        public async Task RegisterUserShouldSuccess()
        {
            User user = new User { UserId = "John", Password = "password@123" };
            MediaTypeFormatter formatter = new JsonMediaTypeFormatter();

            // The endpoint or route of the controller action.
            var httpResponse = await _client.PostAsync<User>("/api/auth/register", user, formatter);

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<bool>(stringResponse);
            Assert.Equal(HttpStatusCode.Created, httpResponse.StatusCode);
            Assert.True(response);
        }

        [Fact, TestPriority(2)]
        public async Task LoginUserShouldSuccess()
        {
            User user = new User { UserId = "John", Password = "password@123" };
            MediaTypeFormatter formatter = new JsonMediaTypeFormatter();

            // The endpoint or route of the controller action.
            var httpResponse = await _client.PostAsync<User>("/api/auth/login", user, formatter);

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            Assert.Equal(HttpStatusCode.OK, httpResponse.StatusCode);
            Assert.True(stringResponse.Length > 0);
        }

        [Fact, TestPriority(3)]
        public async Task AuthenticateUserShouldReturnSuccess()
        {
            User user = new User { UserId = "John", Password = "password@123" };
            MediaTypeFormatter formatter = new JsonMediaTypeFormatter();

            // The endpoint or route of the controller action.
            var httpResponse = await _client.PostAsync<User>("/api/auth/login", user, formatter);

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            
            Assert.Equal(HttpStatusCode.OK, httpResponse.StatusCode);
            Assert.True(stringResponse.Length > 0);

            _client.DefaultRequestHeaders.Add("Authorization", $"Bearer { JsonConvert.DeserializeObject<TokenModel>(stringResponse).Token}");
            var authenticateResponse = await _client.GetAsync("/api/auth/isAuthenticated");
            _client.DefaultRequestHeaders.Remove("Authorization");

            var authenticateStringResponse = await authenticateResponse.Content.ReadAsStringAsync();

            Assert.Equal(HttpStatusCode.OK, authenticateResponse.StatusCode);
            Assert.True(Convert.ToBoolean(authenticateStringResponse));
        }
        #endregion positivetests

        #region negativetests
        [Fact, TestPriority(4)]
        public async Task AuthenticateUserShouldFail()
        {
            // The endpoint or route of the controller action.
            var httpResponse = await _client.GetAsync("/api/auth/isAuthenticated");

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            Assert.Equal(HttpStatusCode.InternalServerError, httpResponse.StatusCode);
            // checking for requests without token in header
            Assert.Equal($"Request header doesn't contain any token", stringResponse);

            _client.DefaultRequestHeaders.Add("Authorization", "Bearer dummyTokenDataForTest");
            var authenticateResponse = await _client.GetAsync("/api/auth/isAuthenticated");
            _client.DefaultRequestHeaders.Remove("Authorization");

            var authenticateStringResponse = await authenticateResponse.Content.ReadAsStringAsync();

            Assert.Equal(HttpStatusCode.InternalServerError, authenticateResponse.StatusCode);
            // checking for requests with invalid token in header
            Assert.Equal($"User is not authenticated!!", authenticateStringResponse);
        }

        [Fact, TestPriority(5)]
        public async Task RegisterUserShouldFail()
        {
            User user = new User { UserId = "John", Password = "password@123" };

            HttpRequestMessage request = new HttpRequestMessage();
            MediaTypeFormatter formatter = new JsonMediaTypeFormatter();

            // The endpoint or route of the controller action.
            var httpResponse = await _client.PostAsync<User>("/api/auth/register", user, formatter);

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            Assert.Equal(HttpStatusCode.Conflict, httpResponse.StatusCode);
            Assert.Equal($"This userId {user.UserId} already in use", stringResponse);
        }

        [Fact, TestPriority(6)]
        public async Task LoginUserShouldFail()
        {
            User user = new User { UserId = "John", Password = "admin123" };

            HttpRequestMessage request = new HttpRequestMessage();
            MediaTypeFormatter formatter = new JsonMediaTypeFormatter();

            // The endpoint or route of the controller action.
            var httpResponse = await _client.PostAsync<User>("/api/auth/login", user, formatter);

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            Assert.Equal(HttpStatusCode.Unauthorized, httpResponse.StatusCode);
            Assert.Equal("Invalid user id or password", stringResponse);
        }

        #endregion negativetests
    }
}
