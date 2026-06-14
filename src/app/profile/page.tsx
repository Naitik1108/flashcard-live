export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        Profile
      </h1>

      <div className="space-y-4">
        <div>Total Decks Studied: 0</div>
        <div>Total Questions Answered: 0</div>
        <div>Correct Answers: 0</div>
        <div>Accuracy: 0%</div>
      </div>
    </main>
  );
}