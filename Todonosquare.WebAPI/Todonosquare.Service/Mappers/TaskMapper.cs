using Todonosquare.Service.Mappers.Abstractions;
using Todonosquare.Service.Models;
using Task = Todonosquare.Data.Entities.Task;

namespace Todonosquare.Service.Mappers
{
    public class TaskMapper : IMapper<Task, TaskVM>
    {
        public Task Map(TaskVM model)
        {
            Task task = new Task
            {
                Id = model.Id,
                Title = model.Title,
                IsCompleted = model.IsCompleted
            };
            return task;
        }

        public TaskVM Map(Task entity)
        {
            TaskVM taskVM = new TaskVM
            {
                Id = entity.Id,
                Title = entity.Title,
                IsCompleted = entity.IsCompleted
            };
            return taskVM;
        }

        public List<Task> Map(List<TaskVM> models)
        {
            List<Task> tasks = new List<Task>();
            foreach (TaskVM task in models)
            {
                tasks.Add(Map(task));
            }

            return tasks;
        }

        public List<TaskVM> Map(List<Task> entities)
        {
            List<TaskVM> tasks= new List<TaskVM>();
            foreach (Task task in entities)
            {
                tasks.Add(Map(task));
            }

            return tasks;
        }
    }
}
