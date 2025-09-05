import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "@/components/ui/button";
import ShoppingOrderDetailsView from "./OrderDetails";
import { useState } from "react";

const ShoppingOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>12345</TableCell>
              <TableCell>01/09/25</TableCell>
              <TableCell>In process</TableCell>
              <TableCell>$1250</TableCell>
              <TableCell>
                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                  <Button onClick={() => setOpenDetailsDialog(true)}>View details</Button>
                  <ShoppingOrderDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders