namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class GiftReceiverUpdate
    {
        int GiftId { get; set; }
        int ReceiverId { get; set; }
        string Operation { get; set; }
    }
}