namespace WebApplication.Models
{
    public static class MappingMethods
    {
        public static WebApi.Individual ToWeb(this Database.Individual individual)
        {
            if (individual == null)
            {
                return null;
            }
            return new WebApi.Individual
            {
                BirthDay = individual.BirthDay,
                FirstName = individual.FirstName,
                Id = individual.Id,
                LastName = individual.LastName
            };
        }

        public static Database.Individual ToDatabase(this WebApi.Individual individual)
        {
            if (individual == null)
            {
                return null;
            }
            return new Database.Individual
            {
                BirthDay = individual.BirthDay,
                FirstName = individual.FirstName,
                Id = individual.Id,
                LastName = individual.LastName
            };
        }

        public static WebApi.Event ToWeb(this Database.Event evt)
        {
            if (evt == null)
            {
                return null;
            }
            return new WebApi.Event
            {
                Id = evt.Id,
                Type = evt.Type,
                Year = evt.Year
            };
        }

        public static Database.Event ToDatabase(this WebApi.Event evt)
        {
            if (evt == null)
            {
                return null;
            }
            return new Database.Event
            {
                Id = evt.Id,
                Type = evt.Type,
                Year = evt.Year
            };
        }

        public static WebApi.Gift ToWeb(this Database.Gift gift)
        {
            if (gift == null)
            {
                return null;
            }
            return new WebApi.Gift
            {
                Buyer = gift.Buyer.ToWeb(),
                BuyerId = gift.BuyerId,
                Description = gift.Description,
                Event = gift.Event.ToWeb(),
                EventId = gift.EventId,
                Id = gift.Id,
                IsVisibleToOthers = gift.IsVisibleToOthers,
                Owner = gift.Owner.ToWeb(),
                OwnerId = gift.OwnerId,
                PriceInCents = gift.PriceInCents,
                Status = gift.Status.ToString(),
                Title = gift.Title,
                Url = gift.Url
            };
        }

        public static Database.Gift ToDatabase(this WebApi.Gift gift)
        {
            if (gift == null)
            {
                return null;
            }
            return new Database.Gift
            {
                Buyer = gift.Buyer.ToDatabase(),
                BuyerId = gift.BuyerId,
                Description = gift.Description,
                Event = gift.Event.ToDatabase(),
                EventId = gift.EventId,
                Id = gift.Id,
                IsVisibleToOthers = gift.IsVisibleToOthers,
                Owner = gift.Owner.ToDatabase(),
                OwnerId = gift.OwnerId,
                PriceInCents = gift.PriceInCents,
                Status = System.Enum.Parse<GiftStatus>(gift.Status),
                Title = gift.Title,
                Url = gift.Url
            };
        }
    }
}