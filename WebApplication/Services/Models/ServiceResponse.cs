namespace WebApplication.Services.Models
{
    public class ServiceResponse<T>
    {
        public ServiceResponseStatus Status { get; set; }

        public T Value { get; set; }
    }
}
