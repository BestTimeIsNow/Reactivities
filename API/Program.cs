using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// add services to container
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

// add middleware to container
var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

if (builder.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
}

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
