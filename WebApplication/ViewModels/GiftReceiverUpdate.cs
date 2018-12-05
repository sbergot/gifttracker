namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class GiftReceiverUpdate
    {
        public int GiftId { get; set; }
        public int ReceiverId { get; set; }
        public string Operation { get; set; }
    }
}