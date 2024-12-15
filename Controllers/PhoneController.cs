using Microsoft.AspNetCore.Mvc;
using Phonify.Service;
using Phonify.Models;
namespace Phonify.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class PhoneController : Controller
    {
        private readonly IPhoneService _phoneService;
        public PhoneController(IPhoneService phoneService) { 
            this._phoneService = phoneService;
        }
        [HttpGet("/phones/{id}")]
        public async Task<ActionResult<Phone>> GetById(int id)
        {
            var phone = await _phoneService.GetPhoneAsync(id);
            return Ok(phone);
        }
        [HttpGet("/phones/getFilteredPhones")]
        public async Task<ActionResult<List<Phone>>> GetFilteredPhones([FromQuery] List<string> vendors,
            [FromQuery] List<string> brands,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] string? sortBy)
        {
            var phones = await _phoneService.GetFilteredPhonesAsync(vendors,brands,minPrice,maxPrice,sortBy);
            return Ok(phones);
        }
    }
}
