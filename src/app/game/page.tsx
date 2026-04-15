import Link from "next/link";
import { GameTrainer } from "@/components/GameTrainer";

export default function GamePage() {
  return (
    <>
      <nav className="gameNav" aria-label="Site">
        <Link href="/" className="gameNavLink">
          ← Home
        </Link>
      </nav>
      <GameTrainer />
    </>
  );
}
