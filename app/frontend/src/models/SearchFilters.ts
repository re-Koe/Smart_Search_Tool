export interface SearchFiltersValues {
  Br: string[]; // ["2","3","4+"]
  Bath_tot: string[]; // ["2","3","4+"]
  sqft: string[]; //["1500-2000","2000-2500"]
  minPrice: string; // "100000"
  maxPrice: string; // "200000"
  Bsmt1_out: string[]; // ["Finished","Partially Finished"]
  minStatusDateRange: string; //Dayjs | null; // 'Fri, 25 Jan 2019 02:00:00 GMT'
  maxStatusDateRange: string; //Dayjs | null; // 'Fri, 25 Jan 2021 02:00:00 GMT'
  Type_own1_out: string[]; // ["Detached","Semi-Detached"]
  A_c: string[]; // ["Central Air","Wall Unit"]
  Yr_built: string[]; // ["0-5","6-15"]
  Gar_spaces: string[]; // ["1","2","3","4+"]
  Park_spcs: string[]; // ["1","2","3","4+"]
  Tot_park_spcs: string[]; // ["1","2","3","4+"]
  Num_kit: string[]; // ["1","2","3+"]
  Lsc: string[]; // "Sold"
  description: string; // "Looking for a 3 bedroom house with a pool in the suburbs. Must have a garage."
  [key: string]: string | string[] | boolean | null;
}

export const defaultFilters: SearchFiltersValues = {
  Br: [], //"",
  Bath_tot: [], //"",
  sqft: [],
  minPrice: "",
  maxPrice: "",
  Bsmt1_out: [],
  minStatusDateRange: "",
  maxStatusDateRange: "",
  Type_own1_out: [],
  A_c: [],
  Yr_built: [],
  Gar_spaces: [],
  Park_spcs: [],
  Tot_park_spcs: [],
  description: "",
  Lsc: [],
  Num_kit: [],
};
