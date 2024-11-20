using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Todonosquare.API.Controllers.Abstractions;
using Todonosquare.Data.Entities;
using Todonosquare.Service.Models;
using Todonosquare.Service.Services.Abstractions;

namespace Todonosquare.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ApiController<TaskVM>
    {
        public TaskController(IApiService<TaskVM> apiService) : base(apiService)
        {
        }
    }
}
