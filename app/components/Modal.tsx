import * as React from "react";
import { Link } from "remix";

export default function Modal({
  closeUrl,
  title,
  children,
}: {
  closeUrl: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="modal">
      <div>
        <Link to={closeUrl} className="modal-close">
          Close
        </Link>
        <h1>{title}</h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
