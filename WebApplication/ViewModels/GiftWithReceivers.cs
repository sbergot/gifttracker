namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class GiftWithReceivers
    {
        public int GiftId { get; set; }
        public List<int> ReceiverIds { get; set; }
    }
}