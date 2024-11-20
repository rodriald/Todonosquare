using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todonosquare.Service.Models;

namespace Todonosquare.Service.Services.Abstractions
{
    public interface IAuthService
    {
        AuthResponseVM? Login(AuthPostVM credentials);
        AuthResponseVM? Signup(AuthPostVM credentials);
    }
}
