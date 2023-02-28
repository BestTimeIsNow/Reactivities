using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly ReactivitiesContext _context;
            private readonly ILogger<Activity> _logger;

            public Handler(ReactivitiesContext context, ILogger<Activity> logger)
            {
                _context = context;
                _logger = logger;
            }
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    for (int i = 1; i <= 5; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000, cancellationToken);
                        _logger.LogInformation($"{i} second(s) have elapsed");
                    }
                }
                catch (Exception)
                {
                    _logger.LogInformation("Cancellation was done");
                }
                return Result<Activity>.Success(await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken));
            }
        }
    }
}
