using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Activity>>> { };

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly ReactivitiesContext _context;
            private readonly ILogger<Activity> _logger;

            public Handler(ReactivitiesContext context, ILogger<Activity> logger) 
            {
                _context = context;
                _logger = logger;
            }
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //try
                //{
                //    for (int i = 0; i < 10; i++)
                //    {
                //        cancellationToken.ThrowIfCancellationRequested();
                //        await Task.Delay(1000, cancellationToken);
                //        _logger.LogInformation($"On the {i} delay iteration");
                //    }
                //}
                //catch (Exception)
                //{
                //    _logger.LogInformation("User cancelled");
                //}
                return Result<List<Activity>>.Success(await _context.Activities.ToListAsync(cancellationToken));
            }
        }
    }
}
