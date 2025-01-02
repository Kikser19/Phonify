using Phonify.Models;

namespace Phonify.Service
{
    public interface IPhoneService
    {
        public Task<List<Phone>> GetPhoneListAsync();  
        public  Task<Phone> GetPhoneAsync(int id);
        public Task<List<string>> GetDistinctBrandsAsync();
        public Task<List<string>> GetDistinctVendorsAsync();
        public Task<List<Phone>> GetFilteredPhonesAsync(
   List<string> vendors,
   List<string> brands,
   decimal? minPrice,
   decimal? maxPrice,
   string sortBy);
    }
}
