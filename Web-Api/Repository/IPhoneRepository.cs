using Phonify.Models;

namespace Phonify.Repository
{
    public interface IPhoneRepository
    {
        public Task<Phone> GetPhoneAsync(int id);
        public Task<List<Phone>> GetAllPhonesAsync();
        public Task<List<Phone>> GetFilteredPhonesAsync(
   List<string> vendors,
   List<string> brands,
   decimal? minPrice,
   decimal? maxPrice,
   string sortBy);
    }
}
