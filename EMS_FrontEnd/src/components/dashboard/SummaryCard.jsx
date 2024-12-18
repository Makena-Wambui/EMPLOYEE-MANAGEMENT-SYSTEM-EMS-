const SummaryCard = ({ icon, text, number, color }) => {
  return (
    /* SummaryCard component is used to display the summary of different data.
        The component takes three props: icon, text, and number.
        The icon prop is used to display the icon, the text prop is used to display the text, and the number prop is used to display the number.
        The component is used in the AdminSummary component to display the summary of the total employees. */

    <div className="bg-white p-4 rounded flex">
      <div
        className={`text-3xl flex justify-center items-center ${color} text-white px-4`}
      >
        {icon}
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
