using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Todonosquare.Data;
using Todonosquare.Data.Entities;
using Todonosquare.Service.Models;
using Todonosquare.Service.Services.Abstractions;

namespace Todonosquare.Service.Services
{
    public class AuthService : IAuthService
    {
        private TodonosquareContext _context;
        private IConfiguration _config;

        public AuthService(TodonosquareContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public AuthResponseVM? Signup(AuthPostVM credentials)
        {
            User newUser = new User
            {
                Username = credentials.Username,
                Password = credentials.Password
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            string token = GenerateJwtToken();

            return new AuthResponseVM
            {
                Username = newUser!.Username,
                Token = token
            };
        }

        public AuthResponseVM? Login(AuthPostVM credentials)
        {
            var user = _context.Users.AsNoTracking()
                .FirstOrDefault(user => user.Username == credentials.Username && user.Password == credentials.Password);

            if (user == null)
            {
                return null;
            }

            string token = GenerateJwtToken();

            return new AuthResponseVM
            {
                Username = user!.Username,
                Token = token
            };
        }

        private string GenerateJwtToken()
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var securityToken = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Issuer"],
            null,
            expires: DateTime.Now.AddMinutes(10),
            signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}
