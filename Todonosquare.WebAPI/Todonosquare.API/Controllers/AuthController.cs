using Microsoft.AspNetCore.Mvc;
using Todonosquare.Service.Models;
using Todonosquare.Service.Services.Abstractions;

namespace Todonosquare.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public ActionResult<AuthResponseVM> Login(AuthPostVM credentials)
        {
            try
            {
                var authResponse = _authService.Login(credentials);

                if (authResponse == null)
                {
                    var error = new { message = "Your credentials are incorrect"};
                    return NotFound(error);
                }

                return Ok(authResponse);
            }
            catch (Exception)
            {
                return StatusCode(500, "There was an error while loging in");
            }
        }

        [HttpPost("signup")]
        public ActionResult<AuthResponseVM> SignUp(AuthPostVM credentials)
        {
            try
            {
                var authResponse = _authService.Signup(credentials);

                if (authResponse == null)
                {
                    return StatusCode(500, "There was an error signing up");
                }

                return Ok(authResponse);
            }
            catch (Exception)
            {
                return StatusCode(500, "There was an error while signing up");
            }
        }
    }
}
