import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface Patient {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: {
    address: string | null;
    number: string | null;
    email: string | null;
  }[];
  medical_issue: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Params
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const filterIssues = searchParams.get('filter_issues'); // comma separated
  const filterAgeMin = searchParams.get('filter_age_min');
  const filterAgeMax = searchParams.get('filter_age_max');
  const sortBy = searchParams.get('sort_by') || 'patient_id'; // patient_id, patient_name, age
  const sortOrder = searchParams.get('sort_order') || 'asc'; // asc, desc
  
  try {
    const dataFilePath = path.join(process.cwd(), 'data.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let data: Patient[] = JSON.parse(fileContents);
    
    // 1. Search (by name)
    if (search) {
      data = data.filter(item => 
        item.patient_name.toLowerCase().includes(search)
      );
    }
    
    // 2. Filter by issue
    if (filterIssues) {
      const issues = filterIssues.split(',').map(i => i.trim().toLowerCase());
      data = data.filter(item => issues.includes(item.medical_issue.toLowerCase()));
    }

    // 2b. Filter by age
    if (filterAgeMin) {
      const minAge = parseInt(filterAgeMin, 10);
      data = data.filter(item => item.age >= minAge);
    }
    if (filterAgeMax) {
      const maxAge = parseInt(filterAgeMax, 10);
      data = data.filter(item => item.age <= maxAge);
    }
    
    // 3. Sort
    data.sort((a, b) => {
      let valA: string | number | null | undefined = a[sortBy as keyof Patient] as any;
      let valB: string | number | null | undefined = b[sortBy as keyof Patient] as any;

      // fallback
      if (valA === undefined || valA === null) valA = '';
      if (valB === undefined || valB === null) valB = '';

      if (typeof valA === 'string' && typeof valB === 'string') {
        const cmp = valA.localeCompare(valB);
        return sortOrder === 'asc' ? cmp : -cmp;
      }
      
      const cmp = valA > valB ? 1 : valA < valB ? -1 : 0;
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    // 4. Pagination
    const totalCount = data.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedData,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });

  } catch (error) {
    console.error("Error reading or processing data.json:", error);
    return NextResponse.json(
      { error: "Failed to load data" },
      { status: 500 }
    );
  }
}
