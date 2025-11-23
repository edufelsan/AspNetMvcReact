import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { CodeExample } from '../CodeExample'

type User = {
    id: string
    name: string
    email: string
    role: string
    status: string
}

const DataTableExamples = () => {
    const { t } = useTranslation()

    // Example 1: Basic Data Table with Sorting
    const data1 = useMemo<User[]>(() => [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
        { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active' },
        { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active' },
    ], [])

    const columns1 = useMemo<ColumnDef<User>[]>(() => [
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        {t('components.dataTable.basic.name')}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: 'email',
            header: t('components.dataTable.basic.email'),
        },
        {
            accessorKey: 'role',
            header: t('components.dataTable.basic.role'),
        },
        {
            accessorKey: 'status',
            header: t('components.dataTable.basic.status'),
        },
    ], [t])

    const [sorting1, setSorting1] = useState<SortingState>([])

    const table1 = useReactTable({
        data: data1,
        columns: columns1,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting1,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting1,
        },
    })

    // Example 2: Data Table with Filtering
    const data2 = useMemo<User[]>(() => [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
        { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active' },
        { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active' },
        { id: '6', name: 'David Lee', email: 'david@example.com', role: 'User', status: 'Inactive' },
        { id: '7', name: 'Emma Davis', email: 'emma@example.com', role: 'Manager', status: 'Active' },
    ], [])

    const columns2 = useMemo<ColumnDef<User>[]>(() => [
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        {t('components.dataTable.filtering.name')}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: 'email',
            header: t('components.dataTable.filtering.email'),
        },
        {
            accessorKey: 'role',
            header: t('components.dataTable.filtering.role'),
            cell: ({ row }) => <div className="capitalize">{row.getValue('role')}</div>,
        },
        {
            accessorKey: 'status',
            header: t('components.dataTable.filtering.status'),
            cell: ({ row }) => {
                const status = row.getValue('status') as string
                return (
                    <div className={status === 'Active' ? 'text-green-600' : 'text-gray-400'}>
                        {status}
                    </div>
                )
            },
        },
    ], [t])

    const [sorting2, setSorting2] = useState<SortingState>([])
    const [columnFilters2, setColumnFilters2] = useState<ColumnFiltersState>([])

    const table2 = useReactTable({
        data: data2,
        columns: columns2,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting2,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters2,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting2,
            columnFilters: columnFilters2,
        },
    })

    // Example 3: Data Table with Pagination and Selection
    const data3 = useMemo<User[]>(() => Array.from({ length: 20 }, (_, i) => ({
        id: `${i + 1}`,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: ['Admin', 'User', 'Manager'][i % 3],
        status: i % 3 === 0 ? 'Inactive' : 'Active',
    })), [])

    const columns3 = useMemo<ColumnDef<User>[]>(() => [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        {t('components.dataTable.pagination.name')}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: 'email',
            header: t('components.dataTable.pagination.email'),
        },
        {
            accessorKey: 'role',
            header: t('components.dataTable.pagination.role'),
        },
        {
            accessorKey: 'status',
            header: t('components.dataTable.pagination.status'),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const user = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t('components.dataTable.pagination.actions')}</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                                {t('components.dataTable.pagination.copyId')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>{t('components.dataTable.pagination.viewDetails')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('components.dataTable.pagination.edit')}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ], [t])

    const [sorting3, setSorting3] = useState<SortingState>([])
    const [columnFilters3, setColumnFilters3] = useState<ColumnFiltersState>([])
    const [rowSelection3, setRowSelection3] = useState({})

    const table3 = useReactTable({
        data: data3,
        columns: columns3,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting3,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters3,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection3,
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting: sorting3,
            columnFilters: columnFilters3,
            rowSelection: rowSelection3,
        },
    })

    const example1Code = {
        frontend: `import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

type User = {
    id: string
    name: string
    email: string
    role: string
    status: string
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
]

const data: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    // ... more data
]

const [sorting, setSorting] = useState<SortingState>([])

const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
        sorting,
    },
})

<div className="rounded-md border">
    <Table>
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </TableHead>
                        )
                    })}
                </TableRow>
            ))}
        </TableHeader>
        <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
</div>`,
        backend: `using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        public class User
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string Role { get; set; }
            public string Status { get; set; }
        }

        [HttpGet]
        public IActionResult GetUsers([FromQuery] string? sortBy = null, [FromQuery] string? sortOrder = "asc")
        {
            var users = new List<User>
            {
                new User { Id = "1", Name = "John Doe", Email = "john@example.com", Role = "Admin", Status = "Active" },
                new User { Id = "2", Name = "Jane Smith", Email = "jane@example.com", Role = "User", Status = "Active" },
                new User { Id = "3", Name = "Bob Johnson", Email = "bob@example.com", Role = "User", Status = "Inactive" },
                new User { Id = "4", Name = "Alice Brown", Email = "alice@example.com", Role = "Manager", Status = "Active" },
                new User { Id = "5", Name = "Charlie Wilson", Email = "charlie@example.com", Role = "User", Status = "Active" }
            };

            if (!string.IsNullOrEmpty(sortBy))
            {
                users = sortBy.ToLower() switch
                {
                    "name" => sortOrder == "desc" 
                        ? users.OrderByDescending(u => u.Name).ToList() 
                        : users.OrderBy(u => u.Name).ToList(),
                    "email" => sortOrder == "desc" 
                        ? users.OrderByDescending(u => u.Email).ToList() 
                        : users.OrderBy(u => u.Email).ToList(),
                    "role" => sortOrder == "desc" 
                        ? users.OrderByDescending(u => u.Role).ToList() 
                        : users.OrderBy(u => u.Role).ToList(),
                    _ => users
                };
            }

            return Ok(users);
        }
    }
}`,
    }

    const example2Code = {
        frontend: `import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

type User = {
    id: string
    name: string
    email: string
    role: string
    status: string
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => <div className="capitalize">{row.getValue('role')}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return (
                <div className={status === 'Active' ? 'text-green-600' : 'text-gray-400'}>
                    {status}
                </div>
            )
        },
    },
]

const [sorting, setSorting] = useState<SortingState>([])
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        sorting,
        columnFilters,
    },
})

<div>
    <div className="flex items-center py-4">
        <Input
            placeholder="Filter by email..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
                table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
        />
    </div>
    <div className="rounded-md border">
        <Table>
            {/* ... table implementation ... */}
        </Table>
    </div>
</div>`,
        backend: `using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUsers(
            [FromQuery] string? sortBy = null, 
            [FromQuery] string? sortOrder = "asc",
            [FromQuery] string? filterEmail = null)
        {
            var users = new List<User>
            {
                new User { Id = "1", Name = "John Doe", Email = "john@example.com", Role = "Admin", Status = "Active" },
                new User { Id = "2", Name = "Jane Smith", Email = "jane@example.com", Role = "User", Status = "Active" },
                new User { Id = "3", Name = "Bob Johnson", Email = "bob@example.com", Role = "User", Status = "Inactive" },
                new User { Id = "4", Name = "Alice Brown", Email = "alice@example.com", Role = "Manager", Status = "Active" },
                new User { Id = "5", Name = "Charlie Wilson", Email = "charlie@example.com", Role = "User", Status = "Active" },
                new User { Id = "6", Name = "David Lee", Email = "david@example.com", Role = "User", Status = "Inactive" },
                new User { Id = "7", Name = "Emma Davis", Email = "emma@example.com", Role = "Manager", Status = "Active" }
            };

            // Apply email filter
            if (!string.IsNullOrEmpty(filterEmail))
            {
                users = users.Where(u => u.Email.Contains(filterEmail, StringComparison.OrdinalIgnoreCase)).ToList();
            }

            // Apply sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                users = sortBy.ToLower() switch
                {
                    "name" => sortOrder == "desc" 
                        ? users.OrderByDescending(u => u.Name).ToList() 
                        : users.OrderBy(u => u.Name).ToList(),
                    "email" => sortOrder == "desc" 
                        ? users.OrderByDescending(u => u.Email).ToList() 
                        : users.OrderBy(u => u.Email).ToList(),
                    _ => users
                };
            }

            return Ok(users);
        }
    }
}`,
    }

    const example3Code = {
        frontend: `import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { useState } from 'react'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    // ... other columns ...
    {
        id: 'actions',
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

const [sorting, setSorting] = useState<SortingState>([])
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
const [rowSelection, setRowSelection] = useState({})

const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
        sorting,
        columnFilters,
        rowSelection,
    },
})

<div>
    <div className="flex items-center py-4">
        <Input
            placeholder="Filter emails..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
                table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    <div className="rounded-md border">
        <Table>
            {/* ... table implementation ... */}
        </Table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    </div>
</div>`,
        backend: `using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUsers(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? sortBy = null,
            [FromQuery] string? sortOrder = "asc",
            [FromQuery] string? filterEmail = null)
        {
            var allUsers = GenerateUsers(50); // Generate sample data

            // Apply email filter
            var filteredUsers = allUsers;
            if (!string.IsNullOrEmpty(filterEmail))
            {
                filteredUsers = filteredUsers
                    .Where(u => u.Email.Contains(filterEmail, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            // Apply sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                filteredUsers = sortBy.ToLower() switch
                {
                    "name" => sortOrder == "desc" 
                        ? filteredUsers.OrderByDescending(u => u.Name).ToList() 
                        : filteredUsers.OrderBy(u => u.Name).ToList(),
                    "email" => sortOrder == "desc" 
                        ? filteredUsers.OrderByDescending(u => u.Email).ToList() 
                        : filteredUsers.OrderBy(u => u.Email).ToList(),
                    _ => filteredUsers
                };
            }

            // Apply pagination
            var totalCount = filteredUsers.Count;
            var paginatedUsers = filteredUsers
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                Data = paginatedUsers,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(string id)
        {
            // Delete user logic
            return Ok(new { message = $"User {id} deleted successfully" });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(string id, [FromBody] User user)
        {
            // Update user logic
            return Ok(new { message = $"User {id} updated successfully", user });
        }

        private List<User> GenerateUsers(int count)
        {
            return Enumerable.Range(1, count).Select(i => new User
            {
                Id = i.ToString(),
                Name = $"User {i}",
                Email = $"user{i}@example.com",
                Role = new[] { "Admin", "User", "Manager" }[i % 3],
                Status = i % 3 == 0 ? "Inactive" : "Active"
            }).ToList();
        }
    }
}`,
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.dataTable.basic.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.dataTable.basic.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table1.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table1.getRowModel().rows?.length ? (
                                    table1.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns1.length} className="h-24 text-center">
                                            {t('components.dataTable.basic.noResults')}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <CodeExample code={example1Code} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.dataTable.filtering.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.dataTable.filtering.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <div className="flex items-center py-4">
                        <Input
                            placeholder={t('components.dataTable.filtering.filterPlaceholder')}
                            value={(table2.getColumn('email')?.getFilterValue() as string) ?? ''}
                            onChange={(event) =>
                                table2.getColumn('email')?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table2.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table2.getRowModel().rows?.length ? (
                                    table2.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns2.length} className="h-24 text-center">
                                            {t('components.dataTable.filtering.noResults')}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <CodeExample code={example2Code} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.dataTable.pagination.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.dataTable.pagination.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <div className="flex items-center py-4">
                        <Input
                            placeholder={t('components.dataTable.pagination.filterPlaceholder')}
                            value={(table3.getColumn('email')?.getFilterValue() as string) ?? ''}
                            onChange={(event) =>
                                table3.getColumn('email')?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    {t('components.dataTable.pagination.columns')} <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table3
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table3.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table3.getRowModel().rows?.length ? (
                                    table3.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && 'selected'}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns3.length} className="h-24 text-center">
                                            {t('components.dataTable.pagination.noResults')}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {table3.getFilteredSelectedRowModel().rows.length} {t('components.dataTable.pagination.of')}{' '}
                            {table3.getFilteredRowModel().rows.length} {t('components.dataTable.pagination.rowsSelected')}
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table3.previousPage()}
                                disabled={!table3.getCanPreviousPage()}
                            >
                                {t('components.dataTable.pagination.previous')}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table3.nextPage()}
                                disabled={!table3.getCanNextPage()}
                            >
                                {t('components.dataTable.pagination.next')}
                            </Button>
                        </div>
                    </div>
                </div>
                <CodeExample code={example3Code} />
            </div>
        </div>
    )
}

export default DataTableExamples
