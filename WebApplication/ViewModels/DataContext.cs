namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class DataContext
    {
        public Dictionary<int, Event> EventMap { get; set; }
        public Dictionary<int, Individual> IndividualMap { get; set; }
        public Dictionary<int, Gift> GiftMap { get; set; }
        public List<int[]> GiftReceiverPairs { get; set; }

        public int CurrentUserId { get; set; }
    }
}