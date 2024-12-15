using Phonify.Models;
using Phonify.Repository;

namespace Phonify.Service
{
    public class PhoneService : IPhoneService
    {
        private readonly IPhoneRepository _repository;
        public PhoneService(IPhoneRepository repository)
        {
            this._repository = repository;
        }
        public async Task<Phone> GetPhoneAsync(int id)
        {
            return await _repository.GetPhoneAsync(id);
        }
        public async Task<List<Phone>> GetFilteredPhonesAsync(List<string> vendors, List<string> brands, decimal? minPrice, decimal? maxPrice, string sortBy)
        {
            return await _repository.GetFilteredPhonesAsync(vendors,brands,minPrice,maxPrice,sortBy);
        }
    }
}
