using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Todonosquare.Data;
using Todonosquare.Data.Entities;
using Todonosquare.Service.Mappers.Abstractions;
using Todonosquare.Service.Models;
using Todonosquare.Service.Services.Abstractions;
using TaskEntity = Todonosquare.Data.Entities.Task;

namespace Todonosquare.Service.Services
{
    public class TaskService : ApiService<TaskEntity, TaskVM>
    {
        public TaskService(IMapper<TaskEntity, TaskVM> mapper, TodonosquareContext context) : base(mapper, context)
        {
        }
    }
}
