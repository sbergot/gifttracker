namespace WebApplication.Tests
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Xunit;

    using Moq;

    using WebApplication.Data;
    using WebApplication.Models.Database;
    using WebApplication.Services.Implementations;
    using WebApplication.Services.Contracts;

    public class GiftTrackerTests
    {
        private AccessControlService _service;

        private ApplicationDbContext GetContext(string name)
        {
            var  options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(name)
                .Options;

            var serviceProvider = new ServiceCollection()
                .AddLogging()
                .BuildServiceProvider();

            var loggerFactory = serviceProvider.GetService<ILoggerFactory>();

            var user = new ApplicationUser();
            user.IndividualId = 1;
            var userAccessorMock = new Mock<IUserAccessor>();
            userAccessorMock
                .Setup(ua => ua.GetUser())
                .Returns(Task.FromResult(user));
            var context = new ApplicationDbContext(options);
            _service = new AccessControlService(
                context,
                loggerFactory,
                userAccessorMock.Object);
            return context;
        }

        [Fact]
        async public void GetVisibleGifts_Returns_Owned_Gifts()
        {
            using (var context = GetContext("test2"))
            {
                context.Gifts.Add(new Gift
                {
                    Id = 1,
                    OwnerId = 1
                });
                context.Gifts.Add(new Gift
                {
                    Id = 3,
                    OwnerId = 1
                });
                context.Gifts.Add(new Gift
                {
                    Id = 2,
                    OwnerId = 2
                });
                context.SaveChanges();
                var gifts = await _service.GetVisibleGifts(1).ToListAsync();
                Assert.Equal(2, gifts.Count);
                Assert.Equal(1, gifts.First().Id);
            }
        }

        [Fact]
        async public void GetVisibleGifts_Returns_VisibleToOther_Gifts()
        {
            using (var context = GetContext("test3"))
            {
                context.Gifts.Add(new Gift
                {
                    Id = 4,
                    OwnerId = 2,
                    IsVisibleToOthers = true,
                });
                context.GiftReceiver.Add(new GiftReceiver
                {
                    GiftId = 4,
                    ReceiverId = 3
                });
                context.Gifts.Add(new Gift
                {
                    Id = 2,
                    OwnerId = 2,
                    IsVisibleToOthers = false
                });
                context.GiftReceiver.Add(new GiftReceiver
                {
                    GiftId = 1,
                    ReceiverId = 3
                });
                context.SaveChanges();
                var gifts = await _service.GetVisibleGifts(1).ToListAsync();
                Assert.Single(gifts);
                Assert.Equal(4, gifts.First().Id);
            }
        }

        [Fact]
        async public void GetVisibleGifts_Exclude_Receiver_Gifts()
        {
            using (var context = GetContext("test4"))
            {
                context.Gifts.Add(new Gift
                {
                    Id = 4,
                    OwnerId = 2,
                    IsVisibleToOthers = true,
                });
                context.GiftReceiver.Add(new GiftReceiver
                {
                    GiftId = 4,
                    ReceiverId = 3
                });
                context.SaveChanges();
                var gifts = await _service.GetVisibleGifts(3).ToListAsync();
                Assert.Empty(gifts);
            }
        }
    }
}
