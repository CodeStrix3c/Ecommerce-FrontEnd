import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Leaf, Search } from 'lucide-react';
import { Box, Button, TextField } from '@mui/material';
import DatePickerWithRange from '../ui/DatePickerWithRange';

const regions = ['Punjab', 'Bihar', 'Maharashtra', 'Haryana', 'UP'];
const crops = ['Wheat', 'Rice', 'Cotton', 'Maize', 'Sugarcane'];

const SearchModal = ({ isOpen, onClose }) => {
  const [region, setRegion] = useState('');
  const [crop, setCrop] = useState('');
  const [dateRange, setDateRange] = useState(null);

  const handleSearch = () => {
    const filters = { region, crop, when: dateRange };
    console.log('Searching with:', filters);
    onClose();
  };

  const handleClear = () => {
    setRegion('');
    setCrop('');
    setDateRange(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">
              Search Pesticides
            </h2>
            <button onClick={onClose}>
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-28">
            {/* WHERE */}
            <div className="border-b py-4">
              <p className="mb-2 text-sm font-semibold text-gray-900">Where?</p>
              <TextField
                fullWidth
                placeholder="Search regions"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                size="small"
                InputProps={{
                  style: { fontSize: '14px' },
                }}
              />
              <div className="mt-3 space-y-2">
                {/* Suggested regions */}
                <div
                  onClick={() => setRegion('Nearby')}
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100"
                >
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-800">Nearby dealers</span>
                </div>
                {regions.map((r) => (
                  <div
                    key={r}
                    onClick={() => setRegion(r)}
                    className="cursor-pointer rounded-lg px-2 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* WHEN */}
            <div className="border-b py-4">
              <p className="mb-2 text-sm font-semibold text-gray-900">When?</p>
              <div className="rounded-lg border px-3 py-2 text-sm text-gray-600">
                <DatePickerWithRange setDateRange={setDateRange} />
              </div>
            </div>

            {/* WHO (adapted to crops/pesticides) */}
            <div className="border-b py-4">
              <p className="mb-2 text-sm font-semibold text-gray-900">What?</p>
              <TextField
                fullWidth
                placeholder="Add crop or pesticide..."
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                size="small"
                InputProps={{
                  style: { fontSize: '14px' },
                }}
              />
              <div className="mt-3 space-y-2">
                {crops.map((c) => (
                  <div
                    key={c}
                    onClick={() => setCrop(c)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-gray-100"
                  >
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-800">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-3 shadow-lg">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                color="inherit"
                onClick={handleClear}
                sx={{
                  textTransform: 'none',
                  fontSize: '14px',
                  color: '#374151',
                }}
              >
                Clear all
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<Search />}
                onClick={handleSearch}
                sx={{ textTransform: 'none', fontSize: '14px' }}
              >
                Find Products
              </Button>
            </Box>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
