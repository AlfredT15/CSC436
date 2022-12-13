import React, { useEffect, useState } from "react";

function CQ() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("/cq");
    const items = await data.json();
    setItems(items);
  };
  return (
    <section>
      <div class="center">
        {items.map((item) => (
          <div class="row padding">
            <div class="alert alert-info rounded-pill" role="alert">
              <i class="fa fa-user mr-2"></i>{" "}
              <i>
                {item.Name} ({item.Ticker}): {item.Number_of_shares}
              </i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CQ;
