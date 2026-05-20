import './StarDonarsSection.css';
const StarDonarsSection = ({ topDonors }) => {
  const rows = topDonors.map((donor) => (
    <div className='row' key={donor.id}>
      {/* LEFT */}
      <div className='left'>
        {donor.image ? (
          <img src={donor.image} className='icon' />
        ) : (
          <div className='icon empty' />
        )}

        <div className='textGroup'>
          <div className='value'>{donor.name}</div>
          <div className='type'>({donor.type})</div>
        </div>
      </div>

      {/* RIGHT */}
      <div className='rightGroup'>
        <div className='value'>{donor.amount}</div>
        <div className='type'>(إجمالي التبرع)</div>
      </div>
    </div>
  ));
  return <div className='star-donors-table'>{rows}</div>;
};

export default StarDonarsSection;
