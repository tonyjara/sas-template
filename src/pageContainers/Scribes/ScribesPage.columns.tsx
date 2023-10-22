import { createColumnHelper } from "@tanstack/react-table";
import DateCell from "@/components/DynamicTables/DynamicCells/Date.cell";
import TextCell from "@/components/DynamicTables/DynamicCells/TextCell";
import { Prisma } from "@prisma/client";
import DurationCell from "../../components/DynamicTables/DynamicCells/Duration.cell";

export const ScribesHomePageArgs =
  Prisma.validator<Prisma.ScribeFindManyArgs>()({
    include: {
      audioFiles: {
        select: { duration: true },
      },
    },
  });

type ScribesForColumn = Prisma.ScribeGetPayload<typeof ScribesHomePageArgs>;

const columnHelper = createColumnHelper<ScribesForColumn>();

const prettyStatus = (status: string) => {
  switch (status) {
    case "published":
      return "Published";
    case "draft":
      return "Draft";
    case "scheduled":
      return "Scheduled";
    default:
      return "Unknown";
  }
};
const statusColors = (status: string) => {
  switch (status) {
    case "published":
      return "green.500";
    case "draft":
      return "gray.500";
    case "scheduled":
      return "orange.500";
    default:
      return "gray.500";
  }
};

export const scribesPageColumns = () => [
  columnHelper.accessor("id", {
    cell: (x) => `# ${x.getValue()}` ?? "-",
    header: "№",
    sortingFn: "alphanumeric",
  }),
  /* columnHelper.accessor("releaseDate", { */
  /*   cell: (x) => */
  /*     x.getValue() ? <DateCell date={x.getValue() ?? new Date()} /> : "-", */
  /*   header: "Release Date", */
  /*   sortingFn: "datetime", */
  /* }), */
  columnHelper.accessor("name", {
    cell: (x) => <TextCell text={x.getValue()} />,
    header: "Name",
    sortingFn: "text",
  }),

  /* columnHelper.accessor("status", { */
  /*   cell: (x) => ( */
  /*     <TextCell */
  /*       color={statusColors(x.getValue())} */
  /*       text={prettyStatus(x.getValue())} */
  /*     /> */
  /*   ), */
  /*   header: "Status", */
  /*   sortingFn: "text", */
  /* }), */

  /* columnHelper.display({ */
  /*   cell: (x) => ( */
  /*     <DurationCell value={x.row.original.audioFiles[0]?.duration} /> */
  /*   ), */
  /*   header: "Duration", */
  /*   sortingFn: "text", */
  /* }), */
  //TODO add small audio player
];
