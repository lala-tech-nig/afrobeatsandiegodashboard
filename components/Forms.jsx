"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PAGE_SIZE = 10;

const Forms = () => {
  const [bookings, setBookings] = useState([]);
  const [connects, setConnects] = useState([]);
  const [bookPage, setBookPage] = useState(1);
  const [connectPage, setConnectPage] = useState(1);
  const [modalItem, setModalItem] = useState(null);

  const fetchData = async () => {
    try {
      const [bookRes, connectRes] = await Promise.all([
        fetch("/api/bookcall"),
        fetch("/api/letsconnect"),
      ]);
      const [bookData, connectData] = await Promise.all([
        bookRes.json(),
        connectRes.json(),
      ]);

      // Ensure the data are arrays
      setBookings(Array.isArray(bookData) ? bookData : []);
      setConnects(Array.isArray(connectData) ? connectData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pageItems = (list, page) =>
    Array.isArray(list)
      ? list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
      : [];

  const nextPage = (type) => {
    if (type === "book" && bookPage * PAGE_SIZE < bookings.length) {
      setBookPage((prev) => prev + 1);
    }
    if (type === "connect" && connectPage * PAGE_SIZE < connects.length) {
      setConnectPage((prev) => prev + 1);
    }
  };

  const prevPage = (type) => {
    if (type === "book" && bookPage > 1) {
      setBookPage((prev) => prev - 1);
    }
    if (type === "connect" && connectPage > 1) {
      setConnectPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="bookcall" className="w-full">
        <TabsList className="w-full flex">
          <TabsTrigger value="bookcall" className="w-1/2">
            Book a Call
          </TabsTrigger>
          <TabsTrigger value="letsconnect" className="w-1/2">
            Let's Connect
          </TabsTrigger>
        </TabsList>

        {/* Book a Call Tab */}
        <TabsContent value="bookcall">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems(bookings, bookPage).map((booking, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.email}</TableCell>
                    <TableCell>{booking.phone}</TableCell>
                    <TableCell>
                      <Button onClick={() => setModalItem(booking)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between p-2">
              <Button
                variant="outline"
                onClick={() => prevPage("book")}
                disabled={bookPage === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Prev
              </Button>
              <Button
                variant="outline"
                onClick={() => nextPage("book")}
                disabled={bookPage * PAGE_SIZE >= bookings.length}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Let's Connect Tab */}
        <TabsContent value="letsconnect">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems(connects, connectPage).map((connect, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{connect.name}</TableCell>
                    <TableCell>{connect.email}</TableCell>
                    <TableCell>{connect.phone}</TableCell>
                    <TableCell>
                      <Button onClick={() => setModalItem(connect)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between p-2">
              <Button
                variant="outline"
                onClick={() => prevPage("connect")}
                disabled={connectPage === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Prev
              </Button>
              <Button
                variant="outline"
                onClick={() => nextPage("connect")}
                disabled={connectPage * PAGE_SIZE >= connects.length}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal */}
      <Dialog open={!!modalItem} onOpenChange={() => setModalItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>
          </DialogHeader>
          {modalItem && (
            <div className="space-y-2">
              <p><strong>Name:</strong> {modalItem.name}</p>
              <p><strong>Email:</strong> {modalItem.email}</p>
              <p><strong>Phone:</strong> {modalItem.phone}</p>
              {modalItem.message && <p><strong>Message:</strong> {modalItem.message}</p>}
              {modalItem.topic && <p><strong>Topic:</strong> {modalItem.topic}</p>}
              {modalItem.details && <p><strong>Details:</strong> {modalItem.details}</p>}
              {modalItem.date && <p><strong>Date:</strong> {modalItem.date}</p>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Forms;
