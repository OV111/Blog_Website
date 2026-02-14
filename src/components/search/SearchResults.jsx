import React, { useEffect, useState } from "react";
import { fetchUserData } from "./services/SearchApi";

export default function SearchResults({ query = "", onSelect, boundaryRef }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    let ignore = false;

    const loadResults = async () => {
      if (!normalizedQuery) {
        setItems([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const results = await fetchUserData(normalizedQuery);
      if (!ignore) {
        setItems(Array.isArray(results) ? results : []);
        setIsLoading(false);
      }
    };

    loadResults();
    return () => {
      ignore = true;
    };
  }, [normalizedQuery]);

  useEffect(() => {
    setOpen(Boolean(normalizedQuery));
  }, [normalizedQuery]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      const boundary = boundaryRef?.current;
      if (!boundary) return;

      if (boundary.contains(event.target)) {
        if (normalizedQuery) setOpen(true);
        return;
      }

      setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [boundaryRef, normalizedQuery]);

  // then for the posts maybe
  const users = items.filter((item) => item.type === "user");

  if (!open) return null;
  return (
    <div className="absolute top-[calc(100%+6px)] w-full max-w-[620px] z-4 overflow-hidden rounded-2xl border border-white/10 bg-purple-900 shadow-xl backdrop-blur ">
      <div className="max-h-80 overflow-auto p-2">
        {isLoading && (
          <div className="px-3 py-2 text-sm text-white/70">Searching...</div>
        )}

        {users.map((user) => (
          <button
            key={`${user.type}-${user.id || user.username}`}
            type="button"
            onClick={() => {
              setOpen(false);
              onSelect?.(user);
            }}
            className="cursor-pointer block w-full rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10"
          >
            <span className="font-medium">{user.title}</span>
            <span className="ml-2 text-white/60">~{user.username}</span>
          </button>
        ))}
        {!isLoading && items.length === 0 && (
          <div className="px-3 py-2 text-sm text-white/70">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}
