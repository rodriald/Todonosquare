using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todonosquare.Service.Models
{
    public class TaskVM
    {
        public int Id { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public required string Title { get; set; }

        public bool IsCompleted { get; set; }
    }
}
