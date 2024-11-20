using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todonosquare.Service.Services.Abstractions
{
    public interface IApiService<TModel>
    {
        List<TModel> GetAll();
        TModel? GetById(int id);
        int Create(TModel item);
        TModel? Delete(int id);
        TModel? Update(int id, TModel item);
    }
}
