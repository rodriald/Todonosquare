using Microsoft.AspNetCore.Mvc;
using Todonosquare.Service.Services.Abstractions;

namespace Todonosquare.API.Controllers.Abstractions
{
    public class ApiController<TModel> : ControllerBase where TModel : class
    {
        private readonly IApiService<TModel> _apiService;

        public ApiController(IApiService<TModel> apiService)
        {
            _apiService = apiService;
        }

        [HttpGet]
        public virtual ActionResult<List<TModel>> Get()
        {
            try
            {
                return _apiService.GetAll();
            }
            catch(Exception)
            {
                return StatusCode(500, "There was an error while retrieving the tasks list");
            }
        }

        [HttpGet("{id}")]
        public virtual ActionResult<TModel> Get(int id)
        {
            try
            {
                var item = _apiService.GetById(id);
                if (item == null)
                {
                    return NotFound();
                }
                return item;
            }
            catch(Exception)
            {
                return StatusCode(500, "There was an error while retrieving the task");
            }
        }

        [HttpPost]
        public virtual IActionResult Post(TModel item)
        {
            try
            {
                int itemId = _apiService.Create(item);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "There was an error while creating the task");
            }
        }

        [HttpPut("{id}")]
        public virtual IActionResult Put(int id, TModel item)
        {
            try
            {
                _apiService.Update(id, item);

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "There was an error while updating the task");
            }
        }

        [HttpDelete("{id}")]
        public virtual IActionResult Delete(int id)
        {
            try
            {
                var item = _apiService.Delete(id);
                if (item == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "There was an error while deleting the task");
            }
        }
    }
}
