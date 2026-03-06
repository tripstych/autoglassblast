import { useState, useEffect } from "react";

const API_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";

interface Make {
  MakeId: number;
  MakeName: string;
}

interface Model {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export function useVehicleMakes() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/GetMakesForVehicleType/car?format=json`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = (data.Results as Make[]).sort((a, b) =>
          a.MakeName.localeCompare(b.MakeName)
        );
        setMakes(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { makes, loading };
}

export function useVehicleModels(make: string, year: string) {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!make || !year) {
      setModels([]);
      return;
    }

    setLoading(true);
    fetch(
      `${API_BASE}/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}/vehicletype/car?format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const sorted = (data.Results as Model[]).sort((a, b) =>
          a.Model_Name.localeCompare(b.Model_Name)
        );
        setModels(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [make, year]);

  return { models, loading };
}
