using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Todonosquare.Data;
using Todonosquare.Data.Entities;
using Todonosquare.Service.Mappers;
using Todonosquare.Service.Mappers.Abstractions;
using Todonosquare.Service.Models;
using Todonosquare.Service.Services;
using Todonosquare.Service.Services.Abstractions;

var sameOriginPolicy = "allowSameOriginsForDevPurposes";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: sameOriginPolicy,
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<TodonosquareContext>(opt => opt.UseInMemoryDatabase("Todonosquare"));

builder.Services.AddScoped<IMapper<Todonosquare.Data.Entities.Task, TaskVM>, TaskMapper>();

builder.Services.AddScoped<IApiService<TaskVM>, TaskService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// JWT Authentication
var jwtIssuer = builder.Configuration.GetSection("Jwt:Issuer").Get<string>();
var jwtKey = builder.Configuration.GetSection("Jwt:Key").Get<string>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtIssuer,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!))
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(sameOriginPolicy);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
