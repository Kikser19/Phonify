using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Phonify.Models;

namespace Phonify.Repository
{
    public class PhoneRepository : IPhoneRepository
    {
        private readonly PhoneContext _context;
        public PhoneRepository(PhoneContext context)
        {
            this._context = context;

        }
        public async Task<Phone> GetPhoneAsync(int id)
        {
            return await _context.Mobile.FindAsync(id);

        }
        public async Task<List<Phone>> GetFilteredPhonesAsync( List<string> vendors, List<string> brands, decimal? minPrice, decimal? maxPrice, string sortBy)
        {
            IQueryable<Phone> query = _context.Mobile;

            // Apply filter for vendors
            if (vendors != null && vendors.Any())
            {
                query = query.Where(p => vendors.Contains(p.Vendor));
            }

            // Apply filter for brands
            if (brands != null && brands.Any())
            {
                query = query.Where(p => brands.Contains(p.Brand));
            }

            // Apply price range filter
            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }
            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            // Sorting logic
            switch (sortBy)
            {
                case "popular":
                    // Assuming you have a field for popularity or you want to sort by another field
                    query = query.OrderByDescending(p => p.Price); // Example sorting by price descending
                    break;
                case "price_asc":
                    query = query.OrderBy(p => p.Price); // Sort by price ascending
                    break;
                case "price_desc":
                    query = query.OrderByDescending(p => p.Price); // Sort by price descending
                    break;
                case "newest":
                    query = query.OrderByDescending(p => p.CreatedAt); // Sort by newest
                    break;
                default:
                    query = query.OrderBy(p => p.Model); // Default sorting
                    break;
            }

            return await query.ToListAsync();
        }

        public async Task<List<Phone>> GetAllPhonesAsync()
        {
            return await _context.Mobile.ToListAsync();
        }

    }
}
