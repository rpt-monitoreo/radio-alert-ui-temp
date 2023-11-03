import Waveform from '../components/waveform';

const ParentComponent = () => {
  const url = import.meta.env.VITE_API_BASE_URL + 'audio';

  return url ? (
    <Waveform
      url={url}
      onSelection={(start, end) => {
        console.log(`Selected region from ${start} to ${end}`);
      }}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default ParentComponent;
