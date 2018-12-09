namespace WebApplication.Models
{
    public static class MappingMethods
    {
        public static WebApi.Individual ToWeb(this Database.Individual individual)
        {
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
            return new WebApi.Event
            {
                Id = evt.Id,
                Type = evt.Type,
                Year = evt.Year
            };
        }

        public static Database.Event ToDatabase(this WebApi.Event evt)
        {
            return new Database.Event
            {
                Id = evt.Id,
                Type = evt.Type,
                Year = evt.Year
            };
        }

        public static WebApi.Gift ToWeb(this Database.Gift gift)
        {
            return new WebApi.Gift
            {
                Buyer = gift.Buyer.ToWeb(),
                Description = gift.Description,
                Event = gift.Event.ToWeb(),
                Id = gift.Id,
                IsVisibleToOthers = gift.IsVisibleToOthers,
                Owner = gift.Owner.ToWeb(),
                PriceInCents = gift.PriceInCents,
                Status = gift.Status,
                Title = gift.Title,
                Url = gift.Url
            };
        }

        public static Database.Gift ToDatabase(this WebApi.Gift gift)
        {
            return new Database.Gift
            {
                BuyerId = gift.BuyerId,
                Description = gift.Description,
                EventId = gift.EventId,
                Id = gift.Id,
                IsVisibleToOthers = gift.IsVisibleToOthers,
                OwnerId = gift.OwnerId,
                PriceInCents = gift.PriceInCents,
                Status = gift.Status,
                Title = gift.Title,
                Url = gift.Url
            };
        }
    }
}