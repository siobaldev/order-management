using Microsoft.EntityFrameworkCore;
using OrderManagement.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add EF Core with SQLite
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=orders.db"));

// Add controllers
builder.Services.AddControllers();

// CORS Policy - Allows React dev server (port 5173)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy => policy.WithOrigins("http://localhost:5173", "http://localhost:5174").AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("AllowReact");
app.MapControllers();
app.Run();