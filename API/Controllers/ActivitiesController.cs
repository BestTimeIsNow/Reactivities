using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly ReactivitiesContext _context;

        public ActivitiesController(ReactivitiesContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid Id)
        {
            var activity = await _context.Activities.FindAsync(Id);

            if (activity == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(activity);
            }
        }
    }
}
