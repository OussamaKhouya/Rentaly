"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteCar } from "@/lib/admin/actions/car";

const onDelete = async (id: string) => {
  const result = await deleteCar(id);
  if (result.success) {
    toast.success("Success", {
      description: "Car deleted successfully",
    });
  } else {
    toast.error("Error", {
      description: result.message,
    });
  }
};

const TransactionsTable = ({ transactions }: { transactions: Car[] }) => {
  return (
    <Table>
      <TableHeader className="bg-[#F8F8FF] text-[#64748B]">
        <TableRow>
          <TableHead className="px-2">Brand</TableHead>
          <TableHead className="px-2">Model</TableHead>
          <TableHead className="px-2">Year</TableHead>
          <TableHead className="px-2">Price Per Day</TableHead>
          <TableHead className="px-2">Fuel Type</TableHead>
          <TableHead className="px-2">Transmission</TableHead>
          <TableHead className="px-2">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Car) => {
          return (
            <TableRow key={t.id}>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {t.brand}
                  </h1>
                </div>
              </TableCell>

              <TableCell className={`pl-2 pr-10 font-semibold`}>
                {t.model}
              </TableCell>

              <TableCell className="pl-2 pr-10">{t.year}</TableCell>

              <TableCell className="min-w-32 pl-2 pr-10">
                {t.pricePerDay}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {t.fuelType}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {t.transmission}
              </TableCell>

              <TableCell className="pl-2 pr-10 min-w-24 flex items-center">
                <Button variant="ghost" size="icon">
                  <SquarePen color="#0089F1" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(t.id)}
                >
                  <Trash2 color="#EF3A4B" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
