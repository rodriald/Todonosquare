using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todonosquare.Data.Entities.Abstractions
{
    public interface IEntity
    {
        int Id { get; set; }
    }
}
