import { useState } from 'react';
import { SITE, mapEmbed } from '../data/config';

// Campus dropdown + embedded Google map (no API key needed).
export default function CampusMap({ height = 'h-80 sm:h-96' }) {
  const [id, setId] = useState(SITE.campuses[0].id);
  const campus = SITE.campuses.find((c) => c.id === id);

  return (
    <div>
      <label htmlFor="campus-select" className="mb-2 block text-sm font-bold text-brand">
        Choose campus
      </label>
      <select id="campus-select" value={id} onChange={(e) => setId(e.target.value)} className="field mb-4 max-w-sm">
        {SITE.campuses.map((c) => (
          <option key={c.id} value={c.id}>{c.name} – {c.level}</option>
        ))}
      </select>

      <div className="overflow-hidden rounded-md border border-brand/20">
        <iframe
          key={campus.id}
          title={`Map of Kids College ${campus.name}`}
          src={mapEmbed(campus.mapQuery)}
          className={`${height} w-full`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="mt-3 text-sm text-ink/80">
        {campus.address}{' '}
        <a href={campus.mapLink} target="_blank" rel="noopener noreferrer" className="font-bold text-brand underline underline-offset-2">
          Get directions
        </a>
      </p>
    </div>
  );
}
