export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <form className="searchbar" onSubmit={e => e.preventDefault()}>
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="9" r="7"/>
        <path d="M17 17l-4-4"/>
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        aria-label="Search"
      />
    </form>
  );
}