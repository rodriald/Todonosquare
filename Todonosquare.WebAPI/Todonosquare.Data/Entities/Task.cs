using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todonosquare.Data.Entities.Abstractions;

namespace Todonosquare.Data.Entities
{
    public class Task : IEntity
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public bool IsCompleted { get; set; }
    }
}
