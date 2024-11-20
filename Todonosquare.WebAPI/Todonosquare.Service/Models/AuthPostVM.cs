using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todonosquare.Service.Models
{
    public class AuthPostVM
    {
        [StringLength(60, MinimumLength = 4)]
        [Required]
        public required string Username { get; set; }

        [StringLength(60, MinimumLength = 5)]
        [Required]
        public required string Password { get; set; }
    }
}
