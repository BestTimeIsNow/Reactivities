using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { };

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly ReactivitiesContext _context;
            private readonly ILogger<Activity> _logger;

            public Handler(ReactivitiesContext context, ILogger<Activity> logger) 
            {
                _context = context;
                _logger = logger;
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
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
                return await _context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}
